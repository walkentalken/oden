import axios from 'axios'

export default {
	getData (metric) {
		return axios.get(process.env.VUE_APP_API_ENDPOINT + metric).then(response => {
			return response.data
		})
	}
}