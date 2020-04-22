export default {
  formateDate(time) {
    if (!time) return;
    let date = new Date(time);
    let hours = date.getHours() < 10 ? "0"+date.getHours() : date.getHours();
    let minutes = date.getMinutes() < 10 ? "0"+date.getMinutes():date.getMinutes();
    let seconds = date.getSeconds()<10?"0"+date.getSeconds():date.getSeconds();
    return date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate() + ' ' + hours  + ':' + minutes + ':' + seconds; 
  },
  pagination(data, callback) {
    return {
      onChange: (current) => {
        callback(current);
      },
      current: data.result.page,
      pageSize: data.result.page_size,
      total: data.result.total,
      showTotal: () => {
        return `共${data.result.total}条数据`
      },
      showQuickJumper: true
    }
  }
}