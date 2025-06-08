export const CreateUser = async (req, res) => {
  try {
    // Logic to create a user
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
