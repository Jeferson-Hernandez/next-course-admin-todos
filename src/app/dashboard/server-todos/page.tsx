export const dynamic = 'force-dynamic'
export const revalidate = 0

import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";
import { TodosGrid, NewTodo } from "@/todos";
import { getUserSessionServer } from "@/auth/actions/auth-actions";
import { redirect } from "next/navigation";

export const metadata = {
  title: 'Listado de todos',
  description: 'Listado de todos',
};

export default async function RestTodosPage() {
  const user = await getUserSessionServer()

  if (!user ) redirect('/api/auth/signin')

  const todos = await prisma.todo.findMany({
    where: { userId: user.id},
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