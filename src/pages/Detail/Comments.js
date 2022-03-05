import React from 'react'
// import { Comment, Avatar, Form, Button, List, Input } from 'antd';
// import moment from 'moment';
// const { TextArea } = Input;

// export default function Comments() {

//     const [state,setState] = useState({
//         comments: [],
//         submitting: false,
//         value: '',
//     })
//     // state = {
//     //     comments: [],
//     //     submitting: false,
//     //     value: '',
//     //   };

//     const CommentList = ({ comments }) => (
//         <List
//           dataSource={comments}
//           header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
//           itemLayout="horizontal"
//           renderItem={props => <Comment {...props} />}
//         />
//       );

//       const Editor = ({ onChange, onSubmit, submitting, value }) => (
//         <>
//           <Form.Item>
//             <TextArea rows={4} onChange={onChange} value={value} />
//           </Form.Item>
//           <Form.Item>
//             <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
//               Add Comment
//             </Button>
//           </Form.Item>
//         </>
//       );

//       const handleSubmit = () => {
//         if (!state.value) {
//           return;
//         }
    
//         setState({
//           submitting: true,
//         });
//         setTimeout(() => {
//             setState({
//               submitting: false,
//               value: '',
//               comments: [
//                 ...state.comments,
//                 {
//                   author: 'Han Solo',
//                   avatar: 'https://joeschmoe.io/api/v1/random',
//                   content: <p>{state.value}</p>,
//                   datetime: moment().fromNow(),
//                 },
//               ],
//             });
//           }, 1000);
//         };

//         const handleChange = e => {
//             setState({
//               value: e.target.value,
//             });
//           };

//           const { comments, submitting, value } = state;

//    return (
//     <div>
//         {comments?.length > 0 && <CommentList comments={comments} />}
//         <Comment
//           avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
//           content={
//             <Editor
//               onChange={handleChange}
//               onSubmit={handleSubmit}
//               submitting={submitting}
//               value={value}
//             />
//           }
//         />
//       </div>
//   )
// }



import { Comment, Avatar, Form, Button, List, Input } from 'antd';
import moment from 'moment';

const { TextArea } = Input;

const CommentList = ({ comments }) => (
  <List
    dataSource={comments}
    header={`${comments.length} ${comments.length > 1 ? 'replies' : 'reply'}`}
    itemLayout="horizontal"
    renderItem={props => <Comment {...props} />}
  />
);

const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>
    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </>
);

class Comments extends React.Component {
  state = {
    comments: [],
    submitting: false,
    value: '',
  };

  handleSubmit = () => {
    if (!this.state.value) {
      return;
    }

    this.setState({
      submitting: true,
    });

    setTimeout(() => {
      this.setState({
        submitting: false,
        value: '',
        comments: [
          ...this.state.comments,
          {
            author: 'Han Solo',
            avatar: 'https://joeschmoe.io/api/v1/random',
            content: <p>{this.state.value}</p>,
            datetime: moment().fromNow(),
          },
        ],
      });
    }, 1000);
  };

  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };

  render() {
    const { comments, submitting, value } = this.state;

    return (
      <>
        {comments.length > 0 && <CommentList comments={comments} />}
        <Comment
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
          content={
            <Editor
              onChange={this.handleChange}
              onSubmit={this.handleSubmit}
              submitting={submitting}
              value={value}
            />
          }
        />
      </>
    );
  }
}

export default Comments
