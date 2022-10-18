db.createUser({
  user: 'domingo_user',
  pwd: 'domingo_pass',
  roles: [
    {
      role: 'readWrite',
      db: 'domingo_db',
    },
  ],
});
