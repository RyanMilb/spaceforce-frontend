var Eth = require('ethjs');
const Web3 = require('web3');

class SendMessage {
    sendMesg(message) {
        console.log('Fee paid, sending message to mesg-app')
        if (window.ethereum) {
            // eslint-disable-next-line no-undef  
            web3 = new Web3(window.ethereum);
            try {
                window.ethereum.enable().then(async function () {
                    // User has allowed account access to DApp...
                    console.log('Metamask access granted')
                    const toAddress = '0x5B91bA1D32B9Cd4c910eb2531f3570c350cd596f'
                    const TokenAbi = require('./erc20abi.json');
                    const TokenAddress = "0x420167d87d35c3a249b32ef6225872fbd9ab85d2";
                    // eslint-disable-next-line no-undef
                    const senderAddress = web3.eth.accounts[0] || await web3.eth.getAccounts().then(function (data) { return data });
                    console.log('Starting Transfer...' + senderAddress)
                    // eslint-disable-next-line no-undef
                    var eth = new Eth(web3.currentProvider);
                    var token = eth.contract(TokenAbi).at(TokenAddress);
                    token.transfer(toAddress, 1000000000000000000, { from: senderAddress, gas: 200000 }, function (err, result) {
                        if (err) console.log(err)
                        else {
                            //Trigger webhook, sending message to que
                            console.log('Fee paid, sending message to mesg-app')
                            fetch('http://localhost:3000/webhook', {
                                method: 'post',
                                mode: 'cors',
                                headers: {
                                    "Content-Type": "application/json",
                                },
                                body: JSON.stringify({ "message": message, "senderID": senderAddress })
                            }).then(function (response) {
                                console.log('Response: ' + response);
                            });
                        }
                    });
                });
            } catch (e) {
                // User has denied account access to DApp...
                console.log('Metamask access denied: ' + e)
            }
        }
        return;
    }
}

export default SendMessage;
