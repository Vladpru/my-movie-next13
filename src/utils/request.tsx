const API_KEY = process.env.API_KEY


interface MV_Request {
  [key : string]: {
    title : string,
    url : string,
  }
}


const requests : MV_Request = {
  trending: {
    title: 'Trending',
    url: '/trending/all/week?api_key=${API_KEY}&language=en-US',
  },
  trendin: {
    title: 'Trending',
    url: '/trending/all/week?api_key=${API_KEY}&language=en-US',
  },

}
