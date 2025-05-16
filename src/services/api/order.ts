import {
  useRoleBasedMutation,
  useRoleBasedQuery,
} from "@/hooks/useRoleBasedQuery";
import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { APIError } from "@/types/error.type";
import orderService from "../order-service";
import { CreateOrderValues } from "@/types/schema/orderFormSchema";

// GET all orders
export const useOrders = () => {
  const { data: orderData, ...props } = useRoleBasedQuery({
    queryKey: ["orders"],
    adminQueryFn: async () => {
      const response = await orderService.getOrders();
      return response.data.data;
    },
    employeeQueryFn: async () => {
      const response = await orderService.getOrders();
      return response.data.data;
    },
  });

  return { orderData, ...props };
};

// GET single order
export const useOrder = (id: number) => {
  const { data: orderData, ...props } = useRoleBasedQuery({
    queryKey: ["order", id],
    adminQueryFn: async () => {
      const response = await orderService.getOrder(id);
      return response.data.data;
    },
    employeeQueryFn: async () => {
      const response = await orderService.getOrder(id);
      return response.data.data;
    },
  });

  return { orderData, ...props };
};

// POST new order
export const usePostOrder = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const {
    mutate: mutatePost,
    isPending,
    ...props
  } = useRoleBasedMutation<CreateOrderValues, CreateOrderValues>({
    adminMutationFn: (data) => orderService.postOrder(data),
    employeeMutationFn: (data) => orderService.postOrder(data),
    onSuccess: (response) => {
      toast({
        title: "Order Created",
        description: response.message || "Order submitted successfully.",
        variant: "default",
        duration: 3000,
        progressColor: "bg-green-500",
      });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
    onError: (error: APIError) => {
      console.error(error);
      toast({
        title: "Submission Failed",
        description:
          error?.response?.data?.message ||
          "An error occurred while submitting the order.",
        variant: "destructive",
        duration: 5000,
        progressColor: "bg-red-500",
      });
    },
  });

  return { mutatePost, isPending, ...props };
};

// PATCH update order
export const useUpdateOrder = (id: number) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const {
    mutate: mutateUpdate,
    isPending,
    ...props
  } = useRoleBasedMutation<CreateOrderValues, CreateOrderValues>({
    adminMutationFn: (data) => orderService.updateOrder(data, id),
    employeeMutationFn: (data) => orderService.updateOrder(data, id),
    onSuccess: (response) => {
      toast({
        title: "Order Updated",
        description: response.message || "Order updated successfully.",
        variant: "default",
        duration: 3000,
        progressColor: "bg-green-500",
      });
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      queryClient.invalidateQueries({ queryKey: ["order", id] });
    },
    onError: (error: APIError) => {
      console.error(error);
      toast({
        title: "Update Failed",
        description:
          error?.response?.data?.message ||
          "An error occurred while updating the order.",
        variant: "destructive",
        duration: 5000,
        progressColor: "bg-red-500",
      });
    },
  });

  return { mutateUpdate, isPending, ...props };
};

// // DELETE order
// export const useDeleteOrder = () => {
//   const queryClient = useQueryClient();
//   const { toast } = useToast();

//   const {
//     mutate: mutateDelete,
//     isPending,
//     ...props
//   } = useRoleBasedMutation<number, CreateOrderValues>({
//     adminMutationFn: (id) => orderService.deleteOrder(id),
//     employeeMutationFn: (id) => orderService.deleteOrder(id),
//     onSuccess: (_, id) => {
//       toast({
//         title: "Order Deleted",
//         description: "The order was successfully deleted.",
//         variant: "default",
//         duration: 3000,
//         progressColor: "bg-green-500",
//       });
//       queryClient.invalidateQueries({ queryKey: ["orders"] });
//       queryClient.removeQueries({ queryKey: ["order", id] });
//     },
//     onError: (error: APIError) => {
//       console.error(error);
//       toast({
//         title: "Deletion Failed",
//         description:
//           error?.response?.data?.message ||
//           "An error occurred while deleting the order.",
//         variant: "destructive",
//         duration: 5000,
//         progressColor: "bg-red-500",
//       });
//     },
//   });

//   return { mutateDelete, isPending, ...props };
// };
