FROM node:14 as builder

ARG COMMIT_SHA
ENV COMMIT_SHA=$COMMIT_SHA

WORKDIR /opt/app

COPY . .
RUN yarn
ENV NODE_ENV production
RUN yarn build

ARG STATIC_BUCKET

#Update stretch repositories https://stackoverflow.com/questions/76094428/debian-stretch-repositories-404-not-found
RUN sed -i s/deb.debian.org/archive.debian.org/g /etc/apt/sources.list
RUN sed -i 's|security.debian.org|archive.debian.org/|g' /etc/apt/sources.list
RUN sed -i '/stretch-updates/d' /etc/apt/sources.list
RUN apt-get update && apt-get install -y awscli

RUN aws s3 cp /opt/app/.next/static s3://${STATIC_BUCKET}/static/_next/static --recursive --cache-control "private, max-age=31536000" \
  &&  aws s3 cp /opt/app/public s3://${STATIC_BUCKET}/static --recursive --cache-control "private, max-age=31536000"

FROM node:14

RUN mkdir /mnt/efs

WORKDIR /opt/app
COPY --from=builder /opt/app/.next .next
COPY --from=builder /opt/app/node_modules node_modules
COPY --from=builder /opt/app/package.json package.json
COPY --from=builder /opt/app/yarn.lock yarn.lock
COPY --from=builder /opt/app/public/connectors public/connectors

EXPOSE 3000

ENV NODE_ENV production

CMD [ "yarn", "start" ]
