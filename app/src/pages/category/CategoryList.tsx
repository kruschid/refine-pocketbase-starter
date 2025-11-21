import { ActionIcon, Card, Group, Menu, SimpleGrid, Text } from "@mantine/core";
import { useList } from "@refinedev/core";
import { IconDots } from "@tabler/icons-react";
import { DeleteButton, EditButton, List, ShowButton } from "refine-mantine";
import { type CategoryRecord, Collections } from "../../pocketbase.generated";

export const CategoryList = () => {
   const { result } = useList<CategoryRecord>({
    resource: Collections.Category,
    pagination: {
      pageSize: 100,
    }
  });

  return (
    <List resource="category">
      <SimpleGrid cols={{
        xs: 1,
        sm: 2,
        md: 3,
        lg: 4,
        xl: 5,
      }}>
        {result.data.map(category => (
          <Card key={category.id} withBorder padding="lg" radius="md">
            <Group justify="space-between" wrap="nowrap">
              <Text fw={500} truncate>{category.title}</Text>
              <Menu withinPortal position="bottom-end" shadow="sm">
                <Menu.Target>
                  <ActionIcon variant="subtle" color="gray">
                    <IconDots size={16} />
                  </ActionIcon>
                </Menu.Target>
                <Menu.Dropdown>
                  <EditButton menuItem recordItemId={category.id} />
                  <ShowButton menuItem recordItemId={category.id} />
                  <DeleteButton menuItem recordItemId={category.id}/>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </Card>
        ))}
      </SimpleGrid>
    </List>
  );
};
