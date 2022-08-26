import moment from 'moment'
export default function CreatedDate({date}:any) {
  return (
    <small>{moment(date).format("MMMM DD YYYY, h:mm a")}</small>
  )
}
