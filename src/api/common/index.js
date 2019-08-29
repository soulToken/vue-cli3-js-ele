import axios from '@/util/axios';
export function getMess(data,id) {   //解除
	return axios({
		url: '/user/no-talk/cancel/'+id,
		method: 'get',
		params: data
	})
}