import type { NextApiRequest, NextApiResponse } from 'next';
import type { Job } from '../../lib/def';
import formidable, { Fields, Formidable } from "formidable";
import clientPromise from "../../lib/mongodb";

export const config = {
    api: {
      bodyParser: false
    }
  }
 
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Job>
) {
    const {query, method } = req
    let job : Job;

    switch (method) {
        case 'POST':
          // Update or create data in your database
            const data = await new Promise<Fields<string>>((resolve, reject) => {
                const form = new Formidable();
                form.parse(req, (err, fields: formidable.Fields) => {
                    if (err) reject({ err })
                    resolve(fields);
                });
            });

            const client = await clientPromise;
            const db = client.db("formWorkshop");
            const collection = db.collection('jobs');

            job = await createJob(data);
            console.debug(job);
            await collection.insertOne(job);

            
          res.status(200).json(job);
          break
        default:
          res.setHeader('Allow', ['POST'])
          res.status(405).end(`Method ${method} Not Allowed`)
      }
    }

async function createJob(form: formidable.Fields) {
  const job : Job = {
        jobName: form.jobName![0],
        customerId: Number(form.customerId![0]),
        materials: form.materialId?.map<number>((currentValue : string) => Number(currentValue)),
        printCustomerName: Boolean(form.printCustomerName),
        printType: Number(form.printType![0]),
        customTextDetails: form.customTextDetails![0],
        notes: form.notes![0]
    }

  return job;
}