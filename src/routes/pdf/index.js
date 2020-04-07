import React, { useState, useEffect } from 'react';
import { Button, message, Pagination } from 'antd';
import { Document, Page, pdfjs } from "react-pdf";
import styles from './index.less';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

export default () => {
  const [text, setText] = useState(false);
  const [pageSize, setPageSize] = useState(1); // 当前页面
  const [pageTotal, setPageTotal] = useState(null);

  useEffect(() => {}, []);

  const onChange = (e) => {
    const file = e.currentTarget.files[0];
    if (file) {
      if ((file.size / 1048576) > 5) {
        message.error(`文件大小不能超过 5MB：${file.name}`);
        return;
      }
      uploadFile(file).then((res) => {
        setText(res);
        setPageSize(1);
      });
    }
  };

  const uploadFile = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (f) => {
        resolve(f.target.result);
      };
      reader.readAsDataURL(file);
    })
  };

  // pdf 生成成功后
  const onDocumentLoadSuccess = ({ numPages }) => {
    setPageTotal(numPages);
  };

  return (
    <React.Fragment>
      <div className={styles.base64_submit}>
        <div>
          <Button><label htmlFor="file">上传</label></Button>
          &nbsp;&nbsp;
          <input accept="application/pdf" id="file" className="hidden" type="file" onChange={onChange} />
        </div>
        <div className={styles.tip}>
          功能介绍: 在线预览 pdf 文件。<br />
          PS: 转化文件需要消耗一些时间，并造成页面短暂卡死。文件越大，持续时间越长！！！
        </div>
      </div>
      <div className={styles.base64_text}>
        {pageTotal && (
          <Pagination
            className={styles.pagination}
            pageSize={1}
            current={pageSize}
            total={pageTotal}
            onChange={(page) => { setPageSize(page) }}
          />
        )}
        <Document
          className={styles.document}
          file={text}
          onLoadSuccess={onDocumentLoadSuccess}
        >
          <Page pageNumber={pageSize} />
        </Document>
      </div>
    </React.Fragment>
  );
}
