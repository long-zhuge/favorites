/*
* react-dnd 拖拽对象。请使用该对象进行包括组件
* */

import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

export default DragDropContext(HTML5Backend);
