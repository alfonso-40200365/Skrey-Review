import { Text, Grid, Row } from '@nextui-org/react';

export const DeleteRow = ({ onDelete }: any) => {
  const handleDelete = () => {
    onDelete(true)
  }

  const handleClose = () => {
    onDelete(false)
  }

  return (
    <Grid.Container css={{ borderRadius: '14px', padding: '0.75rem', maxWidth: '330px' }}>
      <Row justify="center" align="center">
        <Text b>Confirm</Text>
      </Row>
      <Row className="p-5">
        <Text>
          Are you sure you want to delete this row? By doing this, you will not be able to recover the data.
        </Text>
      </Row>
      <Grid.Container justify="center" alignContent="center">
        <Grid>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded ml-1 mr-1"
            onClick={handleDelete}
          >
            Delete
          </button>
        </Grid>
      </Grid.Container>
    </Grid.Container>
  );
};
