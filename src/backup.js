var Eth = require('ethjs');
// var Web3 = require("web3");

const Web3 = require('web3');//

const web3 = new Web3(Web3.givenProvider) || "ws://localhost:8546");

class SendMessage {

    sendMesg(message) {
        var web3js;
        console.log('Attempting to transfer Tokens with web3 then Send Message in webhook.')
        if (window.ethereum) {
            web3js = new Web3(window.ethereum);
            try {
                window.ethereum.enable().then(function () {
                    // User has allowed account access to DApp...
                    console.log('Metamask access granted')
                    
                });
            } catch (e) {
                // User has denied account access to DApp...
                console.log('Metamask access denied')
            }
        }
        const applicationAddress = '0x9d75de4d310ddb796b158c9bb13acfc3edbcbfef'
        const TokenAbi = require('./erc20abi.json');
        const TokenAddress = "0xE41d2489571d322189246DaFA5ebDe1F4699F498";
        const senderAddress = window.web3.eth.accounts[0];
        var eth = new Eth(web3js.currentProvider);
        var token = eth.contract(TokenAbi).at(TokenAddress);

        // //SEND MESSAGE WORKING
        // let reqData = JSON.stringify({ "message": message, "senderID": senderAddress });
        // console.log('Sending Data to Mesg Webhook:' + reqData)
        // //Trigger webhook, sending message to que
        // fetch('http://localhost:3000/webhook', {
        //     method: 'post',
        //     mode: 'cors',
        //     // headers: { "Content-Type" : "text/plain" },
        //     // credentials: 'include',
        //     body: reqData
        // }).then(function (response) {
        //     console.log('Response: ' + JSON.stringify(response.json()));
        // });


        // //TRANSFER WORKING
        eth.accounts()
            .then(function (accounts) {
                console.log('accounts: ' + JSON.stringify(accounts) )

                // token.transfer(applicationAddress, 1000000000000000000, { from: senderAddress }, function (err, result) {
                //     if (err) console.log(err)
                //     else {
                //         let reqData = JSON.stringify({ "message": message, "senderID": senderAddress });
                //         console.log('Sending Data to Mesg Webhook:' + reqData)
                //         //Trigger webhook, sending message to que
                //         fetch('http://localhost:3000/webhook', {
                //             method: 'post',
                //             mode: 'cors',
                //             // headers: { "Content-Type" : "text/plain" },
                //             // credentials: 'include',
                //             body: reqData
                //         }).then(function (response) {
                //             console.log('Response: ' + JSON.stringify(response.json()));
                //         });
                //     }
                // });
            })
            .catch(function (err) {
                console.log('ERROR ' + err);
            });
    }
}
export default SendMessage;