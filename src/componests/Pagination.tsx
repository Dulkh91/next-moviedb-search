'use client'
import {Pagination} from 'antd'

const PaginationPage = () => {
  return (
    <Pagination defaultCurrent={1} defaultPageSize={2} total={50} align='center'/>
  );
};

export default PaginationPage;