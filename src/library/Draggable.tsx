import React from 'react';
import { Table } from 'semantic-ui-react/';

export default function DraggableTableRow (props: any) {

  const { action, children, i } = props;

  function onDragStart(e, i) {
    e.dataTransfer.setData('index', i);
  }

  function onDragEnd (e) {
    e.preventDefault();
  }

  function onDrop (e, newPos) {
    const oldPos = parseInt(e.dataTransfer.getData('index'));
    action(newPos, oldPos);
  }

  return (
    <Table.Row 
      draggable
      className='draggable'
      onDragStart={e => onDragStart(e, i)}
      onDragOver={e => onDragEnd(e)}
      onDrop={e => onDrop(e, i)}>
      {children}
    </Table.Row>
  );

}
