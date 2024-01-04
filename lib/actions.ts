'use server';
export async function createJob(formData: FormData) {
    const rawFormData = {
        jobName: formData.get('jobName'),
        // customerId: formData.get('customerId'),
        // materials: formData.get('materialId'),
        // printtypes: formData.get('printId'),
        // printname: formData.get('printCustomerName'),
        // customText: formData.get('customText'),
        // notes: formData.get('notes'),
      };
      // Test it out:
      console.log(rawFormData);
}