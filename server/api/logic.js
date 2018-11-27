const router = require('express').Router()
const { UserContract, Contract, User } = require('../db/models')
module.exports = router

const axios = require('axios');


const userFromEmail = userEmail => {
  return User.findOne({
    where: {
      email: userEmail
    }
  })
}


function unanswered(item) {
  if (!item.responded) {
    return true;
  }
  return false;
}

// function getMine(item) {
//   if (item.userId === receiver.id) {
//     return true;
//   }
//   return false;
// }

const createBlock = (ourData) => {
   return axios.post('https://join-block.herokuapp.com/mineBlock', {data: ourData})
 //return axios.post('http://localhost:3001/mineBlock', {data: ourData})
 .then(res => res.data)
    .catch(error => console.log(error));
}


router.post('/', (req, res, next) => {
  // if (!req.user) { //checking if user is loggedin
  //   res.status(401).json({ error: "unauthorized" })
  //   return
  // }
 // const sender = req.user;

    userFromEmail(req.body.receiverEmail)
    .then(receiver => {
        UserContract.findOne({ //find contract in question based on contract ID and user id
          where: {
            userId: receiver.id,
            contractId: req.body.contractId
          }
           })
          .then(existingRequests => {
          existingRequests.update({  //Marks contract row as responded
            responded: true,
            response: req.body.yn
          }).then(() => {
              return UserContract.findAll({
              where: {
                contractId: req.body.contractId
              }
               })
        }
            ).then(conts => {
              console.log('conts', conts[0])
              let didntRespond = conts.filter(unanswered);
              const stragglers = didntRespond.map(a => a.userId);
              const myContract = conts.filter(contract => contract.userId === receiver.id);
              if (! didntRespond.length){
                Contract.findOne({ //find contract in question based on contract ID and user id
                  where: {
                    id: req.body.contractId
                  }
                   }).then(cnt => {
                    cnt.update({  //Marks WHole contract true
                      fulfilled: true
                    })
                   }
                    ).then(
                      createBlock({time: new Date(), contractId: req.body.contractId}))
                    .then(createdBlock => {
                                            res.json(createdBlock)
                                          })

              }
              else {
                res.json({contract: myContract, stragglers: stragglers}) //This sends back an array of User IDs of people who have yet to respond
              }
              }

            )



            }  )})})


