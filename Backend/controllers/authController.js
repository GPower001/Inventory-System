import { registerUser, loginUser } from "../services/authService.js";

const register = async (req, res) => {
  try {
    const response = await registerUser(req.body);
    res.status(201).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const response = await loginUser(req.body);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export { register, login };