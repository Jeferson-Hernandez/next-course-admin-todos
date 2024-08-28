export const dynamic = 'force-dynamic'
export const revalidate = 0

import prisma from "@/lib/prisma";
import { TodosGrid, NewTodo } from "@/todos";

export const metadata = {
  title: 'Listado de todos',
  description: 'Listado de todos',
};

export default async function RestTodosPage() {
  const todos = await prisma.todo.findMany({
    orderBy: { description: 'asc' }
  })

  return (
    <>
      <span className="text-3xl">Server Actions</span>
      <div className="w-full px-3 mx-5 my-5">
        <NewTodo />
      </div>
      <TodosGrid todos={todos} />
    </>
  );
}