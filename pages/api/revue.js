/* eslint-disable import/no-anonymous-default-export */
export default async function handler(req, res) {
    // 1. Get the email from the payload and
    // validate if it is empty.
    const { email } = req.body;
    if (!email) {
        return res.status(400).json({error: 'Email is required.'});
    }
  
    // 2. Use the Revue API Key and create a subscriber using
    // the email we pass to the API. Please note, we pass the
    // API Key in the 'Authorization' header.
    try {
        const API_KEY = process.env.REVUE_API_KEY;
        const revueRoute = `${process.env.REVUE_API_URL}subscribers`
        const response = await fetch(revueRoute, {
            body: JSON.stringify({
              email,
            }),
            headers: {
                Authorization: `Token ${API_KEY}`,
              'Content-Type': 'application/json',
            },
            method: 'POST',
        })
    if (response.status >= 400) {
        return res.status(500).json({ error: `There was an error subscribing to the list.` })
        }
    
        return res.status(201).json({ error: '' })
    } catch (error) {
        return res.status(500).json({ error: error.message || error.toString() })
    }
}