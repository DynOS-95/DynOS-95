# 🦕 DynOS 95

- 🏆 Finalist at ETH London 2024 (by [BuidlGuidl](https://buidlguidl.com/) team). Check submission [here](https://ethglobal.com/showcase/dynos-95-9n57a).
- 🥇 Best onboarding UX of Dynamic
- 🥈 Best UX/UI implemention of Nounsdao art
- [README from our Hackathon POC at the end](#Hackathon-Readme)

Open source platform designed to improve the onboarding experience to Web3, providing a friendly environment where users can connect to any DApps with their email or social accounts.

After log in, users can double click in their DApp shortcuts and interact with them using a passkey to sign, while DynOS 95 handles all the blockchain interactions, making the user experience really smooth.

⚙️ Built using Scaffold-ETH, Dynamic, Zerodev, Base ERC4337, and Nouns DAO artwork assets.

|                                                 Desktop                                                 |                                                Open Dapp                                                |
| :-----------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------: |
| ![DynOS95_1](https://github.com/carletex/DynOS-95/assets/55535804/1445fc8a-f2b0-4c80-867f-6354c6a6c525) | ![DynOS95_2](https://github.com/carletex/DynOS-95/assets/55535804/09015aae-561f-4dac-bf60-717b4d2c2c95) |

## DynOS 95 Evolution

We're taking DynOS 95 from a hackathon project to a real-world product for end users. In our vision, DynOS 95 will become a sort of "Home Base" to onboard new users to Web3.

Our platform will enable crypto natives and Web3-savvy users to set up customized Dynos 95 workspaces. Once created, they will be shared with their families or close circles, facilitating their onboarding to Web3 in a private, friendly and secure environment.

We believe DynOS 95 could be one more link towards achieving mass adoption, helping onboard the next billion users.

## Planned features

**Customizable Web3 Workspace.**

An admin, who is a Web3 experienced user, sets up the workspace with a custom configuration. Example of some configurations that could be implemented (TBD):

- Available DApps
- Account abstraction provider
- Multisig
- Sponsored transaction fees
- Rules, limits or protections

**Private shared environment.**

Once configured, the admin can invite family members or close friends who may be less familiar with Web3. This inclusive setup allows them to engage in activities like token swapping, yield farming, NFT purchases... under guided and secure conditions.

New users will be able to create a DynOS 95 account with their email or social accounts, getting a crypto wallet thanks to Account Abstraction.

Admin will be able to manage their access and permissions.

**Conclussion.**

The evolution of DynOS 95 is aimed at not just simplifying the Web3 experience but also making it a communal and family-friendly venture. Our roadmap is designed to gradually introduce and integrate these features, ensuring that every step enhances user trust and engagement, paving the way for broader adoption of Web3.

## Hackathon Readme

<details>
  <summary>Open Hackathon Readme</summary>

Our platform is built to improve the onboarding experience to Web3, providing a friendly environment where users can connect to any DApps with their familiar web2 login system, powered by Dynamic and ERC4337 AA.

![DynOS95_1](https://github.com/carletex/ethlondon-2024/assets/55535804/b41c6872-a614-4b98-aab8-d3a1926b3aa8)

**Stack:**

- 🏗 **Scaffold-eth:** Made it very fast to create and deploy the smart contract and build the UI. Built using NextJS, Hardhat, Wagmi, Viem, and Typescript.

- 🔐 **Dynamic:** Handles all the email and social login “magic”, letting non crypto-native users to login with their known web2 login methods, reducing the gap for mass adoption. Users can then use Dynamic dashboard to configure their accounts even further.

- 💻 **Zerodev:** Is a modular SDK based on Kernel (open-source). Zerodev is integrated with Dynamic, and we’re using it to create the ERC4337 accounts, to let us sponsor some transactions to DynOS 95 users.

- 🔵 **Base ERC4337:** We have an ERC20 contract in Base to reward our users with some DOST tokens, which after their first login can be claimed for free without paying for gas, and will be sent to their ERC4337 account .

- 🎨 **Nouns DAO** artwork assets and our Nouns-inspired custom assets make UI enjoyable and more user-friendly.

![DynOS95_2](https://github.com/carletex/ethlondon-2024/assets/55535804/25c431f9-ed0e-4843-8b1f-9e5a61a35e65)

### Project description

UX in Web 3 is broken, which makes it hard to get mass adopted.

Having to deal with wallets, public addresses, private keys, seed phrase, self-custody, signing transactions, and all of that from the very beginning, is an intimidating and sometimes dangerous experience, even if it’s an experienced developer who is landing to Web3.

**DynOS 95** is built to improve the onboarding experience to Web3, providing a friendly environment where users can connect to any DApps with their familiar web2 login system, powered by Dynamic and ERC4337 AA.

When users land to **DynOS 95** they will be able to use email and social login into our DApp, and once they’re logged in, they can interact with the different DApps seamlessly, without manually login into their systems, having a Single Sign On (SSO) experience.

They can double click in their DApp shortcuts and interact with them, while DynOS 95 handles all the blockchain interactions, making the user experience really smooth. Using other DApps is also posible by using our simple browser.
Users will be able to swap tokens at Uniswap, lend or borrow at Aave or buy NFTs in their favourite marketplaces with no friction.

To reward DynOS 95 users, we’ll let them claim some DOST tokens gasless (sponsored fees), after they log into DynOS 95 for the first time. which we’ll be sending to their ERC4337 account.

All of this is wrapped with Nouns inspired UI to provide a friendly and enjoyable experience while interacting with their favourite DApps.

Our Web3 app is not just a platform, but a door to the crypto world, aimed at teaching, involving, and thrilling users. We're making crypto easier to understand and access for everyone, step by step!

This is an MVP, but we believe this kind of UX could be integrated into popular onramp applications, like Coinbase or Binance, and improve the users onboarding experience.

</details>
