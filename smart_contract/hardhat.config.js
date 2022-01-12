//https://eth-ropsten.alchemyapi.io/v2/QXeKNSVyd8Bvv_K3zlzzBY648NDJcMJa

require('@nomiclabs/hardhat-waffle');

module.exports = {
  solidity: '0.8.0',
  networks:{
    ropsten:{
      url: 'https://eth-ropsten.alchemyapi.io/v2/QXeKNSVyd8Bvv_K3zlzzBY648NDJcMJa', //gotten from the the key of the project created on alchemy
      accounts: ['b593c4a128b99f71d5f5ce05a3f21ba980a0e319f5b09ec0abd367dc4e8ebe0c']
    }
  }
}