const SongPage = ({ params }: { params: { id: string } }) => {
  const { id } = params

  return (
    <span>
      {id}
    </span>
  );
}

export default SongPage;