import { Customer } from '../../../lib/def';
import { PrintType } from '../../../lib/def';
import { Material } from '../../../lib/def';
import Link from 'next/link';
import { FormEvent } from 'react';
import { useState } from 'react';

export default function Form({ customers, printTypes, materials }: { customers: Customer[], printTypes: PrintType[], materials: Material[]}) {
  const [checked, setChecked] = useState(false);
 
  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const response = await fetch('/api/submit', {
    method: 'POST',
    body: formData,
    })

    const data = await response.json()
    console.debug(data);
  }

  function handleChange(){
    setChecked(!checked);
  }
  return (
      <form id="form" onSubmit={handleSubmit}>
        <div className="rounded-md bg-gray-50 p-4 md:p-6">
        {/* Job Name */}
        <div className="mb-4">
          <label htmlFor="jobName" className="mb-2 block text-sm font-bold">
            Job Name
          </label>
          <div className="relative mt-2 rounded-md">
            <div className="relative">
              <input
                id="jobName"
                name="jobName"
                type="text"
                placeholder="Enter Job Name"
                className="w-full peer block rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
                defaultValue=""
                required
              />
            </div>
          </div>
        </div>
        {/* Customer Name */}
        <div className="mb-4">
          <label htmlFor="customer" className="mb-2 block text-sm font-bold">
            Choose customer
          </label>
          <div className="relative">
            <select
              id="customer"
              name="customerId"
              className="w-full peer block cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Select a customer
              </option>
              {customers.map((customer) => (
                <option key={customer.id} value={customer.id}>
                  {customer.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* Materials */}
        <div className="mb-4">
          <table className="table-auto">
            <thead>
                <tr>
                    <td className="font-bold">Materials</td>
                </tr>
            </thead>
            <tbody>
                {materials.map((material) => (
                  <tr key={material.id}>
                    <td>
                      <input type="checkbox" name="materialId" value={material.id}></input>
                    </td>
                    <td>
                      {material.id}
                    </td>
                    <td>
                      {material.name}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {/* Print Options*/}
        <div className="mb-4">
          <label htmlFor="prints" className="mb-2 block text-sm font-bold">
            Choose Print Type
          </label>
          <div className="relative">
            <select
              id="printType"
              name="printType"
              className="w-full mb-2 peer block cursor-pointer rounded-md border border-gray-200 py-2 pl-10 text-sm outline-2 placeholder:text-gray-500"
              defaultValue=""
              required
            >
              <option value="" disabled>
                Select a print type
              </option>
              {printTypes.map((print) => (
                <option key={print.id} value={print.id}>
                  {print.name}
                </option>
              ))}
            </select>
            <div className="mb-4">
                <label htmlFor="printCustomerName">Print Customer Name</label>
                <input name="printCustomerName" type="checkbox" defaultValue={"false"}/>
            </div>
            <div className="mb-4">
              <label htmlFor="customText">Custom Text</label>
              <input 
              type="checkbox" 
              checked={ checked }
              onChange={ handleChange } 
              name="customText"
              />
            </div>
            <textarea name="customTextDetails" hidden={!checked}></textarea>
          </div>
        </div>

        {/* Notes*/}
        <div className="mb-4">
          <label htmlFor="Notes" className="mb-2 block text-sm font-bold">
            Notes: 
          </label>
            <textarea name="notes"></textarea>
        </div>
        <div className="mb-4">
          <Link
            href="#"
            className="items-center rounded-lg bg-gray-100 px-4 text-sm font-bold text-red-600 transition-colors hover:bg-gray-200"
          >Cancel
          </Link>
          <button className="items-center rounded-lg bg-gray-100 px-4 text-sm font-bold text-green-600 transition-colors hover:bg-gray-200" type="submit">Submit</button>
      </div>
      </div>
    </form>
  );
}
