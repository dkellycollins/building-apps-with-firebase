import * as express from 'express';
import * as cors from 'cors';
import * as admin from 'firebase-admin';

export const api = express();

const firebaseApp = admin.initializeApp();

api
  .use(cors())
  .use((req, res, next) => {
    console.log(req.url);
    next();
  })
  .use(async (req, res, next) => {
    const bearerToken = req.headers.authorization;
    if (!bearerToken) {
      res.sendStatus(401);
      return;
    }

    try {
      const idToken = bearerToken.split(' ')[1];
      const decodedToken = await firebaseApp.auth().verifyIdToken(idToken);
      req.userUid = decodedToken.uid;
      next();
    }
    catch (error) {
      console.error(error);
      res.sendStatus(401);
    }
  })
  .get('/getTransactionsTotalForUser', async (req, res) => {
    const userUid = req.userUid;

    try {
      const queryResult = await firebaseApp.firestore()
        .collection('transactions')
        .where('owner', '==', userUid)
        .get();
      const transactionsTotal = queryResult
        .docs
        .map(doc => doc.data().amount)
        .reduce((total, amount) => total + amount, 0);

      res.status(200).json({
        transactionsTotal: transactionsTotal
      });
    }
    catch (error) {
      console.error(error);
      res.status(500).json(error);
    }
  });