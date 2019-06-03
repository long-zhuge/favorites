const template = '<html xmlns:o=\'urn:schemas-microsoft-com:office:office\' xmlns:x=\'urn:schemas-microsoft-com:office:excel\' xmlns=\'http://www.w3.org/TR/REC-html40\'><meta http-equiv="content-type" content="application/vnd.ms-excel; charset=UTF-8"><head><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>工作表1</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml></head><body><table border="1"><tr>{title}</tr>{content}</table></body></html>';
const td = (arr) => {
  let tds = '';

  arr.forEach(item => {
    tds += `<td>${item}</td>`;
  });

  return tds;
};

export default function jsonToExcel(data) {
  if (data && data[0]) {
    let headerData = ''; // 表头
    let contentData = ''; // 表内容

    data.forEach((item, index) => {
      if (index === 0) {
        // 设置表头
        Object.keys(item).forEach(title => {
          headerData += `<th>${title}</th>`;
        });
      }
      contentData += `<tr>${td(Object.values(item))}</tr>`;
    });

    return template.replace('{title}', headerData).replace('{content}', contentData);
  }

  return null;
}
