import * as functions from 'firebase-functions';
import { ImageAnnotatorClient } from '@google-cloud/vision';
import { firebaseApp } from '../shared/firebaseApp';

const visionClient = new ImageAnnotatorClient();

export const processImage = functions.storage.object().onFinalize(async (object) => {
  if (!object.name) {
    console.log("object.name is undefined. Exiting.");
    return;
  }

  const imageUrl = `gs://${object.bucket}/${object.name}`;

  console.log(`Processing image ${imageUrl}`);
  try {
    const results = await visionClient.labelDetection(imageUrl);

    await firebaseApp.firestore()
      .collection('image-results')
      .doc()
      .set({
        imageUrl: imageUrl,
        results: results
      });
  }
  catch (error) {
    console.error(error);
  }
});