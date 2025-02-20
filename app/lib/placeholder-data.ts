// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
    {
      user_id: '410544b2-4001-4271-9855-fec4b6a6442a',
      username: 'JohnHelldiver',
      email: 'user@nextmail.com',
      password: '123456',
      dob: '2012-06-29',
      bio: 'A person',
      user_name: 'John Helldiver',
      pfp_url: ''
    },
    {
      user_id: '796c8a4e-b67c-4420-a13b-e5da82a32b7f',
      username: 'MasterChief',
      email: 'user2@nextmail.com',
      password: '123456',
      dob: '1901-02-14',
      bio: 'A person',
      user_name: 'John',
      pfp_url: ''
    },
    {
      user_id: '62da0902-814c-4f29-aad9-da992ce28570',
      username: 'Eevee',
      email: 'user3@nextmail.com',
      password: '123456',
      dob: '2004-08-21',
      bio: 'A person',
      user_name: 'Eevee Barnes',
      pfp_url: ''
    },
  ];
  
const posts = [
    {
        post_id: 'd6e15727-9fe1-4961-8c5b-ea44a9bd81aa',
        body: 'A post',
        user_id: '410544b2-4001-4271-9855-fec4b6a6442a',
        created: '2025-01-01 09:00:00'
    },
    {
        post_id: '3958dc9e-712f-4377-85e9-fec4b6a6442a',
        body: 'Another post',
        user_id: '410544b2-4001-4271-9855-fec4b6a6442a',
        created: '2025-02-03 09:00:00'
    },
    {
        post_id: '958dc9e-742f-4377-85e9-fec4b6a6442a',
        body: 'Im new here',
        user_id: '796c8a4e-b67c-4420-a13b-e5da82a32b7f',
        created: '2025-02-03 11:00:00'
    },
    {
        post_id: '76d65c26-f784-44a2-ac19-586678f7c2f2',
        body: 'generic text',
        user_id: '410544b2-4001-4271-9855-fec4b6a6442a',
        created: '2025-02-05 08:00:00'
    },
    {
        post_id: 'CC27C14A-0ACF-4F4A-A6C9-D45682C144B9',
        body: 'I dont wanna be here',
        user_id: '62da0902-814c-4f29-aad9-da992ce28570',
        created: '2025-02-07 13:00:00'
    },
    {
        post_id: '13D07535-C59E-4157-A011-F8D2EF4E0CBB',
        body: 'Tgeneric text',
        user_id: '410544b2-4001-4271-9855-fec4b6a6442a',
        created: '2025-02-07 018:00:00'
    },
    {
        post_id: '082a72b0-ca14-41da-8592-f5a767f8f649',
        body: 'I blew up Malevelon Creek',
        user_id: '410544b2-4001-4271-9855-fec4b6a6442a',
        created: '2025-02-08 01:07:00'
    },
    {
        post_id: 'b1dd583c-1bfc-4437-875a-43955edc5877',
        body: 'Insert joke here',
        user_id: '796c8a4e-b67c-4420-a13b-e5da82a32b7f',
        created: '2025-02-09 12:00:00'
    },
    {
        post_id: 'db3ddfcd-1670-41e8-9cba-c795719b37f1',
        body: 'My cat threw up',
        user_id: '410544b2-4001-4271-9855-fec4b6a6442a',
        created: '2025-02-05 02:29:00'
    },
    {
        post_id: '500461d1-16b3-43dd-aacc-286644210216',
        body: 'What is the meaning of life?',
        user_id: '62da0902-814c-4f29-aad9-da992ce28570',
        created: '2025-02-14 22:00:00'
    },

]

  
  export { users, posts };
  