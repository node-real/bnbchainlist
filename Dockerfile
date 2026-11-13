FROM node:24.22.2-alpine3.24 AS builder

ARG COMMIT_SHA
ENV COMMIT_SHA=$COMMIT_SHA

WORKDIR /opt/app

COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile --non-interactive
COPY next.config.js ./
COPY base ./base
COPY components ./components
COPY hooks ./hooks
COPY pages ./pages
COPY public ./public
COPY stores ./stores
COPY styles ./styles
COPY theme ./theme
COPY utils ./utils
COPY tests ./tests
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
RUN yarn test && yarn build

FROM node:24.22.2-alpine3.24 AS runner

RUN apk upgrade --no-cache zlib \
  && mkdir /mnt/efs \
  && rm -rf /usr/local/lib/node_modules/npm /opt/yarn-* \
    /usr/local/bin/npm /usr/local/bin/npx /usr/local/bin/yarn /usr/local/bin/yarnpkg

WORKDIR /opt/app
COPY --from=builder /opt/app/.next .next
COPY --from=builder /opt/app/node_modules node_modules
COPY --from=builder /opt/app/package.json package.json
COPY --from=builder /opt/app/yarn.lock yarn.lock
COPY --from=builder /opt/app/next.config.js next.config.js
COPY --from=builder /opt/app/public public

EXPOSE 3000

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

CMD [ "node", "node_modules/next/dist/bin/next", "start" ]
