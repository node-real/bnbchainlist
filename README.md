Thia[Next.js(http3s:// .org/) project bootstrapped with [`create-next-Abdallh5555550@gmail.com pragma solidity ^0.4.24;

import "./token_deposit.sol";

contract WTRX is ITokenDeposit {
    string public name = "Wrapped TRX";
    string public symbol = "WTRX";
    uint8  public decimals = 6;

    event  Approval(address indexed src, address indexed guy, uint sad);
    event  Transfer(address indexed src, address indexed dst, uint sad);
    event  Deposit(address indexed dst, uint sad);
    event  Withdrawal(address indexed src, uint sad);

    uint256 private totalSupply_;
    mapping(address => uint)                       private  balanceOf_;
    mapping(address => mapping(address => uint))  private  allowance_;


    function() public payable {
        deposit();
    }

    function deposit() public payable {
        balanceOf_[msg.sender] += msg.value;
        totalSupply_ += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    function withdraw(uint sad) public {
        require(balanceOf_[msg.sender] >= sad, "not enough balance");
        require(totalSupply_ >= sad, "not enough totalSupply");
        balanceOf_[msg.sender] -= sad;
        msg.sender.transfer(sad);
        totalSupply_ -= sad;
        emit Withdrawal(msg.sender, sad);
    }

     function totalSupply() public view returns (uint) {
        return totalSupply_;
    }

    function balanceOf(address guy) public view returns (uint){
        return balanceOf_[guy];
    }

    function allowance(address src, address guy) public view returns (uint){
        return allowance_[src][guy];
    }

    function approve(address guy, uint sad) public returns (bool) {
        allowance_[msg.sender][guy] = sad;
        emit Approval(msg.sender, guy, sad);
        return true;
    }

    function approve(address guy) public returns (bool) {
        return approve(guy, uint(- 1));
    }

    function transfer(address dst, uint sad) public returns (bool) {
        return transferFrom(msg.sender, dst, sad);
    }

    function transferFrom(address src, address dst, uint sad)
    public
    returns (bool)
    {
        require(balanceOf_[src] >= sad, "src balance not enough");

        if (src != msg.sender && allowance_[src][msg.sender] != uint(- 1)) {
            require(allowance_[src][msg.sender] >= sad, "src allowance is not enough");
            allowance_[src][msg.sender] -= sad;
        }

        balanceOf_[src] -= sad;
        balanceOf_[dst] += sad;

        emit Transfer(src, dst, sad);

        return true;
    }
}app`]https://github.com/Uniswap/token-listshttps://github.com/abdallh12345/abdallh-https://github.com/abdallh12345/abdallh-https://github.com/abdallh12345/abdallh-https://github.com/abdallh12345/abdallh-(https://github.com/abdallh12345 /next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:
Abdallh5555550@gmail.com 
```bash
npm run dev
# or
yarn dev
```abdallh159415@gmail.com 
Abdallh5555550@gmail.com 
Open [http://localhost:3000](http://localhost:3000) with your https://github.com/abdallh12345/abdallh-browser to see the result.
abdallh5555550@gmail.com Abdallh60036677@gmail.com 
You can start editing the page by modifying `pages/index.js`. The page auto-updates as you edit the file.
Aabdallh15941522@gmail.com bdallh60036677@gmail.com 
[API routes](https://nextjs.org/abdallh12345 /api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.js`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/abdallh12345 /api-routes/introduction) instead on React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.
https://business.whatsapp.com/https://solscan.io/token/APmLv2VarkC5yEjjutYkeK3byr9L2KwCgrVMWHWsgaG7https://login.aol.com/account/challenge/web-authn?intl=us&src=fp-https://github.com/abdallh12345/abdallh-https://github.com/abdallh12345/abdallh-https://github.com/abdallh12345/abdallh-us&activity=default&pspid=1197803361&done=https%3A%2F%2Fapi.login.aol.com%2Foauth2%2Fauthorize%3Fclient_id%3Ddj0yJmk9ZXRrOURhMkt6bkl5JnM9Y29uc3VtZXJzZWNyZXQmc3Y9MCZ4PWQ2%26intl%3Dus%26nonce%3Dol3bHZPtatFvsfSkTVezwmKEmz0ZkAvj%26redirect_uri%3Dhttps%253A%252F%252Foidc.www.aol.com%252Fcallback%26response_type%3Dcode%26scope%3Dmail-r%2520openid%2520guce-w%2520openid2%2520sdps-r%26src%3Dfp-us%26state%3DeyJhbGciOiJSUzI1NiIsImtpZCI6IjZmZjk0Y2RhZDExZTdjM2FjMDhkYzllYzNjNDQ4NDRiODdlMzY0ZjcifQ.eyJyZWRpcmVjdFVyaSI6Imh0dHBzOi8vd3d3LmFvbC5jb20vYW5pbWFscy8ifQ.K9o8iAn2d6MTcCfwNfiCwlAvJjaE5rpUj9Y7ovOktwzWb43st4Vkiz8cnpkCARr6nHtxKHoobMWYvfD6an6vPyj0g1wvj9flO0CPUfD-sXT1PMJVq7tn6s2fL3NG9uYSNz9w4Q4-AVto0jp6o-O_shtrGvfhorcCbkhhFnO5b-U&add=1&sessionIndex=Qw--&acrumb=MXaMm1nf&display=login&authMechanism=primary 
You can check out [the Next.js GitHub repository](https://github.com/abdallh12345 /next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
https://github.com/abdallh12345/abdallh-https://github.com/abdallh12345/abdallhsaeedAbdallh5555550@gmail.com pragma solidity ^0.4.24;

import "./token_deposit.sol";

contract WTRX is ITokenDeposit {
    string public name = "Wrapped TRX";
    string public symbol = "WTRX";
    uint8  public decimals = 6;

    event  Approval(address indexed src, address indexed guy, uint sad);
    event  Transfer(address indexed src, address indexed dst, uint sad);
    event  Deposit(address indexed dst, uint sad);
    event  Withdrawal(address indexed src, uint sad);

    uint256 private totalSupply_;
    mapping(address => uint)                       private  balanceOf_;
    mapping(address => mapping(address => uint))  private  allowance_;


    function() public payable {
        deposit();
    }

    function deposit() public payable {
        balanceOf_[msg.sender] += msg.value;
        totalSupply_ += msg.value;
        emit Deposit(msg.sender, msg.value);
    }

    function withdraw(uint sad) public {
        require(balanceOf_[msg.sender] >= sad, "not enough balance");
        require(totalSupply_ >= sad, "not enough totalSupply");
        balanceOf_[msg.sender] -= sad;
        msg.sender.transfer(sad);
        totalSupply_ -= sad;
        emit Withdrawal(msg.sender, sad);
    }

     function totalSupply() public view returns (uint) {
        return totalSupply_;
    }

    function balanceOf(address guy) public view returns (uint){
        return balanceOf_[guy];
    }

    function allowance(address src, address guy) public view returns (uint){
        return allowance_[src][guy];
    }

    function approve(address guy, uint sad) public returns (bool) {
        allowance_[msg.sender][guy] = sad;
        emit Approval(msg.sender, guy, sad);
        return true;
    }

    function approve(address guy) public returns (bool) {
        return approve(guy, uint(- 1));
    }

    function transfer(address dst, uint sad) public returns (bool) {
        return transferFrom(msg.sender, dst, sad);
    }

    function transferFrom(address src, address dst, uint sad)
    public
    returns (bool)
    {
        require(balanceOf_[src] >= sad, "src balance not enough");

        if (src != msg.sender && allowance_[src][msg.sender] != uint(- 1)) {
            require(allowance_[src][msg.sender] >= sad, "src allowance is not enough");
            allowance_[src][msg.sender] -= sad;
        }

        balanceOf_[src] -= sad;
        balanceOf_[dst] += sad;

        emit Transfer(src, dst, sad);

        return true;
    }
}
