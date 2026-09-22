/**
 * Fee structure — PMF and Federal fee structures for GBIST.
 * ⚠️ Replace the amounts below with official college fees when available.
 */

export const feeStructures = {
  pmf: {
    label: "PMF",
    description: "Punjab Medical Faculty Fee Structure",
    programs: {
      "dispenser": {
        admissionFee: 20000,
        monthlyFee: 4000,
        yearlyFee: 48000,
        twoYearPackage: null,
      },
      "medical-lab-technology": {
        admissionFee: 20000,
        monthlyFee: 4000,
        yearlyFee: 48000,
        twoYearPackage: null,
      },
      "operation-theater-technology": {
        admissionFee: 20000,
        monthlyFee: 4000,
        yearlyFee: 48000,
        twoYearPackage: null,
      },
      "dental-technician": {
        admissionFee: 20000,
        monthlyFee: 14500,
        yearlyFee: 174000,
        twoYearPackage: 350000,
      },
      "physiotherapy-technician": {
        admissionFee: 20000,
        monthlyFee: 14500,
        yearlyFee: 174000,
        twoYearPackage: 350000,
      },
      "dialysis-technician": {
        admissionFee: 20000,
        monthlyFee: 14500,
        yearlyFee: 174000,
        twoYearPackage: 350000,
      },
    },
  },
  federal: {
    label: "Federal",
    description: "Federal Fee Structure",
    programs: {
      "dispenser": {
        admissionFee: 30000,
        monthlyFee: 14500,
        yearlyFee: 174000,
        twoYearPackage: 350000,
      },
      "medical-lab-technology": {
        admissionFee: 30000,
        monthlyFee: 14500,
        yearlyFee: 174000,
        twoYearPackage: 350000,
      },
      "operation-theater-technology": {
        admissionFee: 30000,
        monthlyFee: 14500,
        yearlyFee: 174000,
        twoYearPackage: 350000,
      },
      "dental-technician": {
        admissionFee: null,
        monthlyFee: null,
        yearlyFee: null,
        twoYearPackage: null,
      },
      "physiotherapy-technician": {
        admissionFee: null,
        monthlyFee: null,
        yearlyFee: null,
        twoYearPackage: null,
      },
      "dialysis-technician": {
        admissionFee: null,
        monthlyFee: null,
        yearlyFee: null,
        twoYearPackage: null,
      },
    },
  },
};

/* Other one-time and recurring charges */
export const additionalCharges = [
  {
    label: "Security Deposit",
    amount: 2000,
    frequency: "One-time",
    note: "Refundable on course completion",
  },
  {
    label: "PMF Registration & Exam",
    amount: 3000,
    frequency: "Yearly",
    note: "Punjab Medical Faculty registration and examination charges",
  },
  {
    label: "Lab & Practical Charges",
    amount: 1000,
    frequency: "Per Month",
    note: "Covers consumables used in practical training sessions",
  },
  {
    label: "Library & Activities",
    amount: 500,
    frequency: "Yearly",
    note: "Library access and co-curricular activities",
  },
];

export const programWiseNote =
  "Fee is currently uniform across all programs. Program-specific charges (if any) are announced with the admission form.";

export const feeIncludes = [
  "Classroom instruction aligned with PMF curriculum",
  "Supervised laboratory and practical training sessions",
  "Course materials and handouts",
  "Internal assessments and exam preparation",
  "Certificate on successful course completion",
];

export const paymentNotes = [
  "Monthly fee is payable by the 10th of each month.",
  "Yearly payment option is available — pay 12 months together.",
  "Installment plan for the admission fee can be discussed with the accounts office.",
  "Fees can be paid at the institute accounts office during office hours.",
];