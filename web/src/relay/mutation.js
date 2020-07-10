import { commitMutation } from "react-relay";
import Environment from './Environment';

function commit(
  mutation,
  data,
  onCompleted,
  onError
) {

  const variables = {
    data,
  };

  return commitMutation(Environment, {
    mutation,
    variables,
    onCompleted,
    onError,
  });
}
export default { commit };