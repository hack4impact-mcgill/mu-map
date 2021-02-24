import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import RootRef from "@material-ui/core/RootRef";
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  ListItemSecondaryAction,
} from "@material-ui/core";
import DragHandleIcon from "@material-ui/icons/DragHandle";
import ClearIcon from "@material-ui/icons/Clear";

interface IDragDropProps {
  passedItems: [];
  itemsReorderedCallback: (startIndex: number, endIndex: number) => void;
  itemDeletedCallback: (deleteIndex: number) => void;
}

// this logic should be moved to parent but idk how
const convertToDndForm = (items: []) => {
  let dndItems: any[] = [];
  items.forEach(function (item: any, index) {
    dndItems.push({
      id: item.id!.toString(),
      primary: item.name!,
      secondary: item.address!,
    });
  });
  return dndItems;
};

function DragDrop(props: IDragDropProps) {
  const [items, setItems] = useState<any[]>(
    convertToDndForm(props.passedItems)
  );

  /**
   * A function to reorder a list when an item is dragged
   * @param list list to be reordered
   * @param startIndex index from which item was dragged
   * @param endIndex index to which the item was dragged to
   */
  const reorder = (list: any, startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  /**
   * if drag location is valid, reorders the list and calls back the parent component
   * @param result
   */
  const onDragEnd = (result: any) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    const newitems: any[] = reorder(
      items,
      result.source.index,
      result.destination.index
    );
    setItems(newitems);
    props.itemsReorderedCallback(result.source.index, result.destination.index);
  };

  /**
   * dynamically changes style of draggable item
   * @param isDragging determines if we are currently dragging
   * @param draggableStyle not sure :(
   */
  const getItemStyle = (isDragging: any, draggableStyle: any) => ({
    // styles we need to apply on draggables
    ...draggableStyle,
    ...(isDragging && {
      background: "rgb(235,235,235)",
    }),
  });

  /**
   * dynamically change list style during drag
   * @param isDraggingOver determines if we are currently dragging
   */
  const getListStyle = (isDraggingOver: boolean) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
  });

  /**
   * deletes item from state and calls back parent
   * @param index index of item to be deleted
   */
  const deleteItem = (index: number) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
    props.itemDeletedCallback(index);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided, snapshot) => (
          <RootRef rootRef={provided.innerRef}>
            <List style={getListStyle(snapshot.isDraggingOver)}>
              {items.map((item: any, index: any) => (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <ListItem
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      ref={provided.innerRef}
                      style={getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >
                      <ListItemIcon>
                        <DragHandleIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={item.primary}
                        secondary={item.secondary}
                      />
                      <ListItemSecondaryAction>
                        <IconButton>
                          <ClearIcon onClick={() => deleteItem(index)} />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </List>
          </RootRef>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default DragDrop;
