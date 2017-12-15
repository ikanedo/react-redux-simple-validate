export default {
  rules: {
    firstName: {
      required: true
    },
    lastName: {
      required: true
    },
    line1: {
      required: true
    },
    town: {
      required: true
    },
    postalCode: {
      required: true
    },
    country: {
      required: true
    },
    phoneNumber: {
      required: true
    }
  },
  messages: {
    firstName: {
      required: 'Please enter your first name'
    },
    lastName: {
      required: 'Please enter your last name'
    },
    line1: {
      required: 'Please enter your Address'
    },
    town: {
      required: 'Please enter your Town'
    },
    postalCode: {
      required: 'Please enter your Postcode'
    },
    country: {
      required: 'Please select your Country'
    },
    phoneNumber: {
      required: 'Please enter your phone number'
    }
  }
};
