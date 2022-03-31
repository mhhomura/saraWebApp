import React, { useState } from 'react';
import './DnD.css';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import axios_base from '../../../axios_base';
import { useParams, useLocation } from 'react-router-dom';
import {
  Container,

} from './styles';

function DanD() {
  let location = useLocation();

  let { id } = useParams();
  const [listStage, setListStage] = useState([]);

  const loadStage = React.useCallback(() => {
    try {
      axios_base.get(`/campaign/${id}/stage`)
        .then(res => {
          setListStage(res.data);
          console.log('testes');

        })
    } catch (error) {
    }
  }, [id])

  React.useEffect(() => {
    loadStage();
  }, [loadStage, location]);

  /*   const item = {
      id: v4(),
      name: "Matheus"
    } */

  const handleDragEnd = ({ destination, source }) => {
    if (!destination) {
      return
    }
    if (destination.index === source.index && destination.droppableId === source.droppableId) {
      return
    }

    try {
      var data = {
        "stage_id": parseInt(destination.droppableId),
      }
      axios_base.patch(`/campaign/${id}/member/${source.index}`, data)
        .then(res => {
          console.log(res.data);
          loadStage();
        })
    } catch (error) {

    }
    setTimeout(() => {
      /* alert('testes'); */
    }, 5000);

    // Creating a copy of item before removing it from state
    /* const itemCopy = { ...listStage} */

    //setListLeads(prev => {

    //prev = { ...prev }
    // Remove from previous items array
    //prev[parseInt(source.droppableId)]?.members.splice(source.index, 1)

    // Adding to new items array location
    //prev[parseInt(destination.droppableId)]?.members.splice(destination.index, 0)

    //return prev
    //})

  }


  return (
    <Container>
      <DragDropContext onDragEnd={handleDragEnd}>
        {listStage?.map((data, key) => {
          return (
            <div key={data.id} className="ColumP">
              <div className={"title"}><h3 className={"titles"}>{data?.name}</h3> </div>
              <div key={data.id} className={"column"}>

                <Droppable droppableId={data.id.toString()}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                        className={"droppable-col"}
                      >

                        {data.members?.map((el, index) => {
                          return (
                            <Draggable key={el.id} index={el.id} draggableId={el.id.toString()}>
                              {(provided, snapshot) => {
                                console.log(snapshot)
                                return (
                                  <div
                                    className={`item ${snapshot.isDragging && "dragging"}`}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  >
                                    {el?.number.split(':')[0]}
                                  </div>
                                )
                              }}
                            </Draggable>
                          )
                        })}
                        {provided.placeholder}

                      </div>
                    )
                  }}
                </Droppable>
              </div>
            </div>
          )
        })}
      </DragDropContext>
    </Container>
  );
}

export default DanD;
