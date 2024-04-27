import axios from 'axios'
export const postGenerate = (
  // TODO: type fix
  data: Partial<any>

) =>
  axios({
    url: `https://aiopen.cytelab.net/paid/create`,
    method: 'post',
    data: { ...data, uid: "871410a4-9675-447a-94ee-2933c7fd1f97" },
    timeout: 30 * 1000,
  }).then((r: any) => r.data);

