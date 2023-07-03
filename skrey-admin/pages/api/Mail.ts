import { NextApiRequest, NextApiResponse } from 'next'
import Mailjet from 'node-mailjet'

const apiKey: string = process.env.NEXT_PUBLIC_MJ_APIKEY_PUBLIC as string
const apiSecret: string = process.env.NEXT_PUBLIC_MJ_APIKEY_PRIVATE as string

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const mailjet = Mailjet.apiConnect(apiKey, apiSecret)

        const request = await mailjet
            .post('send', { version: 'v3.1' })
            .request({
                "Messages": [
                    {
                        "From": {
                            "Email": "alfonsovillanueva.00@gmail.com",
                            "Name": "Alfonso Villanueva"
                        },
                        "To": [
                            {
                                "Email": "alfonsovillanueva.00@gmail.com",
                                "Name": "First User"
                            }
                        ],
                        "Subject": "My first Email Feedback",
                        "TextPart": "Did you enjoy the service? Please fill the survey to get your Feedback",
                        "HTMLPart": `
                        <html>
                        <head>
                            <title>Product raiting form</title>
                            <style>
                                html,
                                body {
                                    height: 100%;
                                }

                                body, h1, h3, input {
                                    padding: 0;
                                    margin: 0;
                                    outline: none;
                                    font-family: Roboto, Arial, sans-serif;
                                    font-size: 16px;
                                    color: #666;
                                }

                                h1, h3 {
                                    padding: 12px 0;
                                    font-weight: 400;
                                }

                                h1 {
                                    font-size: 28px;
                                }

                                .main-block, .info {
                                    display: flex;
                                    flex-direction: column;
                                }

                                .main-block {
                                    justify-content: center;
                                    align-items: center;
                                    width: 100%;
                                    min-height: 100%;
                                    background: url("/uploads/media/default/0001/01/49bff73f282c2c21f3341f1fe457fe35337b1792.jpeg") no-repeat center;
                                    background-size: cover;
                                }

                                form {
                                    width: 86%;
                                    padding: 20px;
                                    margin-bottom: 20px;
                                    border-radius: 5px;
                                    border: solid 1px #ccc;
                                    box-shadow: 1px 2px 5px rgba(0, 0, 0, .31);
                                    background: #ebebeb;
                                }

                                .info-item {
                                    width: 100%;
                                }

                                input[type=radio] {
                                    display: none;
                                }

                                label.radio {
                                    position: relative;
                                    display: inline-block;
                                    text-indent: 32px;
                                    cursor: pointer;
                                }

                                label.radio:before {
                                    content: "";
                                    position: absolute;
                                    left: 0;
                                    width: 18px;
                                    height: 18px;
                                    border-radius: 50%;
                                    border: 0.5px solid #0000ff;
                                    background: #fff;
                                }

                                label.radio:after {
                                    content: "";
                                    position: absolute;
                                    width: 8px;
                                    height: 4px;
                                    top: 5px;
                                    left: 4px;
                                    border-bottom: 3px solid #0000ff;
                                    border-left: 3px solid #0000ff;
                                    transform: rotate(-45deg);
                                    opacity: 0;
                                }

                                input[type=radio]:checked+label:after {
                                    opacity: 1;
                                }

                                textarea {
                                    width: 99%;
                                    margin-bottom: 12px;
                                }

                                button {
                                    width: 100%;
                                    padding: 8px;
                                    border-radius: 5px;
                                    border: none;
                                    background: #0000ff;
                                    font-size: 14px;
                                    font-weight: 600;
                                    color: #fff;
                                }

                                .grade-type div {
                                    display: flex;
                                    margin: 6px 0;
                                }
                            </style>
                        </head>

                        <body>
                            <div class="main-block">
                                <h1>Product Raiting Form</h1>
                                <form action="/">
                                    <div class="grade-type">
                                        <h3>Rate Our Product</h3>
                                        <div>
                                            <input type="radio" value=5 id="radioOne" name="grade" checked />
                                            <label for="radioOne" class="radio">5 - Excellent</label>
                                        </div>
                                        <div>
                                            <input type="radio" value=4 id="radioTwo" name="grade" />
                                            <label for="radioTwo" class="radio">4 - Very Good</label>
                                        </div>
                                        <div>
                                            <input type="radio" value=3 id="radioThree" name="grade" />
                                            <label for="radioThree" class="radio">3 - Good</label>
                                        </div>
                                        <div>
                                            <input type="radio" value=2 id="radioFour" name="grade" />
                                            <label for="radioFour" class="radio">2 - Bad</label>
                                        </div>
                                        <div>
                                            <input type="radio" value=1 id="radioFive" name="grade" />
                                            <label for="radioFive" class="radio">1 - Very Bad</label>
                                        </div>
                                    </div>
                                    <h3>Please Comment on Your Rating</h3>
                                    <textarea rows="4"></textarea>
                                    <button type="submit" href="/api/email">Submit</button>
                                </form>
                            </div>
                        </body>
                        </html>
                        `
                    }
                ]
            })

        return res.status(200).json('Success')

    } catch (e) {
        res.status(500).send(e)
    }
}
export default handler
