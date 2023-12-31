async function save (review, prisma) {
  const createdReview = await prisma.review.create({
    data: {
      title: review.title,
      description: review.description,
      rating: review.rating,
      product: {
        connect: {
          id: review.productId
        }
      },
      author: {
        connect: {
          id: review.authorId
        }
      }
    }
  });
  return createdReview;
}

async function getReview (id, prisma) {
  const review = await prisma.review.findUnique({
    where: {
      id: parseInt(id)
    }
  });
  return review;
}

async function getReviews (prisma) {
  const reviews = await prisma.review.findMany();
  return reviews;
}

async function updateReview (id, review, prisma) {
  const updatedReview = await prisma.review.update({
    where: {
      id: parseInt(id)
    },
    data: {
      title: review.title,
      description: review.description,
      rating: review.rating
    }
  });
  return updatedReview;
}

async function deleteReview (id, prisma) {
  const deletedReview = await prisma.review.delete({
    where: {
      id: parseInt(id)
    }
  });
  return deletedReview;
}

export default {
  save,
  getReview,
  getReviews,
  updateReview,
  deleteReview
};
