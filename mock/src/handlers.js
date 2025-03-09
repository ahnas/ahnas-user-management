import { rest } from 'msw';

export const handlers = [
  rest.get('http://localhost:8000/users', (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        {
          id: 1,
          name: 'John Doe',
          email: 'johndoe@example.com',
          address: { street: '123 Main St', city: 'New York' },
          isLoading: false,
          error: null
        },
        {
          id: 2,
          name: 'Jane Doe',
          email: 'janedoe@example.com',
          address: { street: '456 Elm St', city: 'Los Angeles' },
          isLoading: false,
          error: null
        },
        {
          id: 3,
          name: 'Boy Is',
          email: 'boyis@example.com',
          address: { street: '789 Oak St', city: 'Chicago' },
          isLoading: false,
          error: null
        },
      ])
    );
  }), 

  rest.get('http://localhost:8000/users/:id', (req, res, ctx) => {
    const { id } = req.params;
    if (id === '1') {
      return res(
        ctx.status(200),
        ctx.json({ id: 1, name: 'John Doe', email: 'johndoe@example.com', isLoading: false, error: null })
      );
    } else {
      return res(ctx.status(404), ctx.json({ error: 'User not found' }));
    }
  }),

  rest.post('http://localhost:8000/users', (req, res, ctx) => {
    const { name, email } = req.body;
    const newUser = { id: Date.now(), name, email, isLoading: false, error: null };
    return res(
      ctx.status(201),
      ctx.json(newUser)
    );
  }),
];
