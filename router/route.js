import { Router } from "express";
const router = Router();

//* Question Routes API Call

router.get('/questions', (req, res) =>{
    res.json("Question API call successful");
});

router.post('/questions', (req, res) =>{
    res.json("Question Post API call successful");
});






export default router;