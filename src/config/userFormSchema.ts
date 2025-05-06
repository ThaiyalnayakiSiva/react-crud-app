export const userFormSchema = [
  { name: "firstName", label: "First Name", type: "text", required: true },
  { name: "lastName", label: "Last Name", type: "text", required: true },
  {
    name: "email",
    label: "Email",
    type: "email",
    required: true,
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Invalid email format"
    }
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "tel",
        placeholder: "+919876543210",
    required: true,
    minLength: {
      value: 10,
      message: "Phone number is too short",
    },
    maxLength: {
      value: 15,
      message: "Phone number is too long",
    },
    pattern: {
      value: /^\+\d{10,14}$/,
      message: "Enter a valid phone number with country code (e.g. +919876543210)",
    },
  }
];
