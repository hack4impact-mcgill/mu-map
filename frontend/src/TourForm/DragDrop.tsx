import React, { useEffect, useState } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
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
import InboxIcon from "@material-ui/icons/Inbox";
import EditIcon from "@material-ui/icons/Edit";

const useStyles = makeStyles((theme: Theme) => createStyles({}));

interface IDragDropProps {
    passedItems: [];
    itemsReorderedCallback: (startIndex: number, endIndex: number) => void;
}

const convertToDndForm = (items: []) => {
    let dndItems: any[] = []
    items.forEach(function (item: any, index) {
        dndItems.push({
            "id": item.id!.toString(),
            "primary": item.name!,
            "secondary": item.address!
        })
    })
    return dndItems
}

function DragDrop(props: IDragDropProps) {
  const styles = useStyles();
  const [items, setItems] = useState<any[]>(convertToDndForm(props.passedItems));

  /**
   * A function to reorder a list when an item is dragged
   * @param list lsit to be reordered
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
    props.itemsReorderedCallback(result.source.index, result.destination.index)
  };

  /**
   * dynamically change list style during drag
   * @param isDraggingOver determines if we are currently dragging
   */
  const getListStyle = (isDraggingOver:boolean) => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
  });

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
                    >
                      <ListItemIcon>
                        <InboxIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary={item.primary}
                        secondary={item.secondary}
                      />
                      <ListItemSecondaryAction>
                        <IconButton>
                          <EditIcon />
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
