import axios from "axios";
import axios_base_chat from "../axios_base_chat";

export async function send(content: any, type: any, chat: any, departamrnt: any, token: any, sign: any) {
    var data = new FormData();
    data.append("content", content);
    data.append("content_type", type);
    data.append("signature", sign);

    return await axios.request({
        method: 'POST',
        url: `${process.env.REACT_APP_LINK_API}/chat/department/${departamrnt}/attendance/${chat}/message`,
        headers: {
            'Content-Type': 'multipart/form-data; boundary=---011000010111000001101001',
            Authorization: `Bearer ${token}`
        },
        data: data
    });
}

