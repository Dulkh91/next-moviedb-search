
export function getRateMoviesSWRKey(guestSessionId: string | null,page:number) {
  return guestSessionId ? `/api/rated?guest_session_id=${guestSessionId}&page=${page}` : null;
}

/*
ប្រើជាមួយ
RatedPage,
DeleteBtn,
VoteStar


*/