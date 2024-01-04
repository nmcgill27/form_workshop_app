import { InferGetServerSidePropsType } from "next";
import { Customer } from '../../lib/def';
import { PrintType } from '../../lib/def';
import { Material } from '../../lib/def';
import Form  from './ui/form';
import clientPromise from "../../lib/mongodb";

export default function Page({ customers, printTypes, materials
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
    return (
        <div>
          <Form customers={customers} printTypes={printTypes} materials={materials} />
        </div>
    );
}

export async function getServerSideProps() {
    try {
        const client = await clientPromise;
        const db = client.db("formWorkshop");

        const customers = await db
            .collection<Customer>("customers")
            .find({})
            .toArray();

        const printTypes = await db
            .collection<PrintType>("print_types")
            .find({})
            .toArray();

        const materials = await db
            .collection<Material>("materials")
            .find({})
            .toArray();

        return {
            props: { customers: JSON.parse(JSON.stringify(customers)), printTypes: JSON.parse(JSON.stringify(printTypes)), materials: JSON.parse(JSON.stringify(materials)) },
        };
    } catch (e) {
        console.error(e);
    }
}