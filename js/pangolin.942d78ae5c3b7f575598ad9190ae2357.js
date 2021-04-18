/*!
* YieldFarming
* Boilerplate for a Static website using EJS and SASS
* https://yieldfarming.info
* @author Jongseung Lim -- https://yieldfarming.info
* Copyright 2021. MIT Licensed.
*/

$(function () {
  
  consoleInit();
  start(main);

});

const thispagespools = [
  { 
    strategy: '0x234ed7c95Be12b2A0A43fF602e737225C83c2aa1', 
    nickname: 'PNG-YFI Pangolin LP',
    token0: '0x60781C2586D68229fde47564546784ab3fACA982',
    token1: '0x99519acb025a0e0d44c3875a4bbf03af65933627', 
    pair: '0xa465e953f9f2a00b2c1c5805560207b66a570093'    
  },
  { 
    strategy: '0x14F98349Af847AB472Eb7f7c705Dc4Bee530713B', 
    nickname: 'PNG-UNI Pangolin LP',
    token0: '0x60781C2586D68229fde47564546784ab3fACA982',
    token1: '0xf39f9671906d8630812f9d9863bbef5d523c84ab', 
    pair: '0x874685bc6794c8b4befbd037147c2eef990761a9'    
  },  
  { 
    strategy: '0x3270b685A4a61252C6f30c1eBca9DbE622984e22', 
    nickname: 'PNG-AAVE Pangolin LP',
    token0: '0x60781C2586D68229fde47564546784ab3fACA982',
    token1: '0x8ce2dee54bb9921a2ae0a63dbb2df8ed88b91dd9', 
    pair: '0x0025cebd8289bbe0a51a5c85464da68cbc2ec0c4'    
  },
  { 
    strategy: '0xcD651AD29835099334d312a9372418Eb2b70c72F', 
    nickname: 'PNG-DAI Pangolin LP',
    token0: '0x60781C2586D68229fde47564546784ab3fACA982',
    token1: '0xba7deebbfc5fa1100fb055a87773e1e99cd3507a', 
    pair: '0xd765b31399985f411a9667330764f62153b42c76'    
  },  
  { 
    strategy: '0x8eDd233546730C51a9d3840e954E5581Eb3fDAB1', 
    nickname: 'SUSHI-PNG Pangolin LP',
    token0: '0x39cf1bd5f15fb22ec3d9ff86b0727afc203427cc',
    token1: '0x60781C2586D68229fde47564546784ab3fACA982', 
    pair: '0xf105fb50fc6ddd8a857bbecd296c8a630e8ca857'    
  },  
  { 
    strategy: '0x7987aDB3C789f071FeFC1BEb15Ce6DfDfbc75899', 
    nickname: 'PNG-USDT Pangolin LP',
    token0: '0x60781C2586D68229fde47564546784ab3fACA982',
    token1: '0xde3A24028580884448a5397872046a019649b084', 
    pair: '0xE8AcF438B10A2C09f80aEf3Ef2858F8E758C98F9'    
  },
  { 
    strategy: '0x392c51Ab0AF3017E3e22713353eCF5B9d6fBDE84', 
    nickname: 'PNG-LINK Pangolin LP',
    token0: '0x60781C2586D68229fde47564546784ab3fACA982',
    token1: '0xB3fe5374F67D7a22886A0eE082b2E2f9d2651651', 
    pair: '0x7313835802c6e8ca2a6327e6478747b71440f7a4'    
  },
  { 
    strategy: '0x763Aa38c837f61DD8429313933Cc47f24E881430', 
    nickname: 'WBTC-PNG Pangolin LP',
    token0: '0x408D4cD0ADb7ceBd1F1A1C33A0Ba2098E1295bAB',
    token1: '0x60781C2586D68229fde47564546784ab3fACA982', 
    pair: '0xf372ceae6b2f4a2c4a6c0550044a7eab914405ea'    
  },
  { 
    strategy: '0x3815f36C3d60d658797958EAD8778f6500be16Df', 
    nickname: 'PNG-ETH Pangolin LP',
    token0: '0x60781C2586D68229fde47564546784ab3fACA982',
    token1: '0xf20d962a6c8f70c731bd838a3a388D7d48fA6e15',
    pair: '0x53b37b9a6631c462d74d65d61e1c056ea9daa637'
  }  
]

async function main() {  

  return Promise.all([
    init_ethers(),
    getAvaxPrices(),
    $.getJSON('https://x-api.snowball.network/tvl/snob.json'),
  ]).then(results => {
    
    window.app = results[0]  
    window.prices = results[1]  
    window.tvl = results[2]
    
    gentop().then(res => { console.log('top done:') })

    return loadMultipleSnowglobePools(window.app, tokens, prices, pools).then(apr_array => {      
      genpool(apr_array, thispagespools.pop())
    })
  })

}