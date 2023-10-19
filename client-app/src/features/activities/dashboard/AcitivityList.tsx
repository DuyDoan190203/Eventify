import { Button, Item, ItemGroup, ItemHeader, ItemMeta, Label, Segment } from "semantic-ui-react";
import { SyntheticEvent, useState } from "react";
import { useStore } from "../../../app/stores/store";
import { observer } from "mobx-react-lite";
import { Link } from "react-router-dom";

export default observer(function ActivityList() {
  const {activityStore} = useStore();
  const {deleteActivity, activitiesByDate, loading} = activityStore;


  const [target, setTarget] = useState('');

  function handleDeletedActivity(e: SyntheticEvent<HTMLButtonElement>, id: string) {
    setTarget(e.currentTarget.name);
    deleteActivity(id);
  }
  return(
    <Segment>
      <ItemGroup divided>
          {activitiesByDate.map(activity => (
             <Item key={activity.id}>
                <Item.Content>
                  <ItemHeader as='a'>{activity.title}</ItemHeader>
                  <ItemMeta>{activity.date}</ItemMeta>
                  <Item.Description>
                    <div>{activity.description}</div>
                    <div>{activity.city}, {activity.venue}</div>
                  </Item.Description>
                  <Item.Extra>
                    <Button as = {Link} to={`/activities/${activity.id}`} 
                    floated="right" content='View' color="blue"/>``
                    <Button
                      name={activity.id} 
                      loading={loading && target === activity.id} 
                      floated="right" 
                      content='Delete' 
                      color="red"/>
                    <Label basic content ={ activity.category}/>
                  </Item.Extra>
                </Item.Content>
             </Item>
          ))}
      </ItemGroup>
    </Segment>
  )
})