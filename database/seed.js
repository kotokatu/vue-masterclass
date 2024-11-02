/* eslint-env node */

import { faker } from "@faker-js/faker";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.VITE_SUPABASE_URL,
  process.env.SERVICE_ROLE_KEY,
);

const seedProjects = async numEntries => {
  const projects = [];

  for (let i = 0; i < numEntries; i++) {
    const name = faker.lorem.words(2);

    projects.push({
      name,
      slug: name.toLocaleLowerCase().replaceAll(/ /g, "-"),
      status: faker.helpers.arrayElement(["in-progress", "completed"]),
      collaborators: faker.helpers.arrayElements([1, 2, 3]),
    });
  }

  const { data, error } = await supabase
    .from("projects")
    .insert(projects)
    .select();

  if (error) console.error(error);

  return data;
};

const seedTasks = async (numEntries, projectIds) => {
  const tasks = [];

  for (let i = 0; i < numEntries; i++) {
    tasks.push({
      name: faker.lorem.words(3),
      status: faker.helpers.arrayElement(["in-progress", "completed"]),
      description: faker.lorem.paragraph(),
      due_date: faker.date.future(),
      project_id: faker.helpers.arrayElement(projectIds),
      collaborators: faker.helpers.arrayElements([1, 2, 3]),
    });
  }

  const { data, error } = await supabase
    .from("tasks")
    .insert(tasks)
    .select("id");

  if (error) console.error(error);

  return data;
};

const seedDatabase = async numEntriesPerTable => {
  const projects = await seedProjects(numEntriesPerTable);
  const projectIds = projects.map(project => project.id);
  await seedTasks(numEntriesPerTable, projectIds);
};

await seedDatabase(10);
