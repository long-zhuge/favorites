import React from 'react';
import { Link } from 'components';
import Exception from 'components/Exception';

export default () => (
  <Exception type="500" style={{ minHeight: 500, height: '80%' }} linkElement={Link} />
);
